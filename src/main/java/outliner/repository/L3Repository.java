package outliner.repository;

import org.springframework.stereotype.Repository;

import outliner.domain.L3;
import outliner.persistence.CustomRepository;


/**
 * Spring Data  repository for the L3 entity.
 */
@Repository
public interface L3Repository extends CustomRepository<L3, Long> {

}
