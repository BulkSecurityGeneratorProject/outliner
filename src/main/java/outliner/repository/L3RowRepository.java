package outliner.repository;

import org.springframework.stereotype.Repository;

import outliner.domain.L3Row;
import outliner.persistence.CustomRepository;


/**
 * Spring Data  repository for the L3Row entity.
 */
@Repository
public interface L3RowRepository extends CustomRepository<L3Row, Long> {

}
