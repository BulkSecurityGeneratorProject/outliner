package outliner.repository;

import org.springframework.stereotype.Repository;

import outliner.domain.L2;
import outliner.persistence.CustomRepository;


/**
 * Spring Data  repository for the L2 entity.
 */
@Repository
public interface L2Repository extends CustomRepository<L2, Long> {

}
